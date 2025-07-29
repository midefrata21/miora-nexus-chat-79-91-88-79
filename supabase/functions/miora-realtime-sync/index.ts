import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RealtimeEvent {
  type: 'system_update' | 'metric_push' | 'log_entry' | 'task_created' | 'repair_triggered';
  data: any;
  timestamp: number;
  source: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const events: RealtimeEvent[] = await req.json();
    console.log(`⚡ MIORA Realtime Sync: Processing ${events.length} events`);

    const results = {
      processed: 0,
      errors: 0,
      systemUpdates: 0,
      metricsInserted: 0,
      logsInserted: 0,
      tasksCreated: 0,
      repairsTriggered: 0
    };

    for (const event of events) {
      try {
        await processRealtimeEvent(supabase, event, results);
        results.processed++;
      } catch (error) {
        console.error(`❌ Error processing event ${event.type}:`, error);
        results.errors++;
      }
    }

    // Trigger real-time notifications for critical events
    await sendRealtimeNotifications(supabase, events);

    console.log(`✅ MIORA Realtime Sync Completed:`, results);

    return new Response(
      JSON.stringify({
        success: true,
        results,
        timestamp: Date.now()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('❌ MIORA Realtime Sync Error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        timestamp: Date.now()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

async function processRealtimeEvent(supabase: any, event: RealtimeEvent, results: any) {
  switch (event.type) {
    case 'system_update':
      await handleSystemUpdate(supabase, event.data);
      results.systemUpdates++;
      break;

    case 'metric_push':
      await handleMetricPush(supabase, event.data);
      results.metricsInserted++;
      break;

    case 'log_entry':
      await handleLogEntry(supabase, event.data);
      results.logsInserted++;
      break;

    case 'task_created':
      await handleTaskCreated(supabase, event.data);
      results.tasksCreated++;
      break;

    case 'repair_triggered':
      await handleRepairTriggered(supabase, event.data);
      results.repairsTriggered++;
      break;

    default:
      console.warn(`⚠️ Unknown event type: ${event.type}`);
  }
}

async function handleSystemUpdate(supabase: any, data: any) {
  const { error } = await supabase
    .from('miora_systems')
    .upsert({
      system_id: data.systemId,
      name: data.name || 'MIORA System',
      type: data.type || 'autonomous',
      status: data.isActive ? 'active' : 'inactive',
      performance_score: data.performanceScore || 0,
      last_activity: new Date().toISOString(),
      capabilities: data.capabilities || [],
      activation_count: data.activationCount || 0,
      total_runtime_seconds: data.totalRuntime || 0,
      error_count: data.errorCount || 0,
      optimization_count: data.optimizationCount || 0
    }, { onConflict: 'system_id' });

  if (error) throw error;
}

async function handleMetricPush(supabase: any, data: any) {
  const { error } = await supabase
    .from('miora_system_metrics')
    .insert({
      system_id: data.systemId || 'miora-core',
      metric_type: data.type,
      value: data.value,
      unit: data.unit || 'count',
      metadata: {
        source: 'realtime-sync',
        category: data.category || 'performance',
        ...data.metadata
      }
    });

  if (error) throw error;
}

async function handleLogEntry(supabase: any, data: any) {
  const { error } = await supabase
    .from('miora_system_logs')
    .insert({
      system_id: data.systemId || 'miora-core',
      level: data.level || 'info',
      category: data.category || 'system',
      message: data.message,
      event_type: data.eventType || 'realtime',
      metadata: {
        source: 'realtime-sync',
        urgent: data.urgent || false,
        ...data.metadata
      }
    });

  if (error) throw error;
}

async function handleTaskCreated(supabase: any, data: any) {
  const { error } = await supabase
    .from('miora_autonomous_tasks')
    .insert({
      task_id: data.id,
      name: data.description || 'Autonomous Task',
      type: data.type,
      description: data.description,
      status: data.status || 'pending',
      priority: getPriorityNumber(data.priority || 'medium'),
      progress: data.progress || 0,
      result: data.result || {},
      auto_generated: true,
      system_id: data.systemId || 'miora-core'
    });

  if (error) throw error;
}

async function handleRepairTriggered(supabase: any, data: any) {
  const { error } = await supabase
    .from('miora_auto_repairs')
    .insert({
      repair_id: data.repairId || `repair_${Date.now()}`,
      system_id: data.systemId,
      issue_type: data.issueType,
      issue_description: data.issueDescription,
      repair_action: data.repairAction,
      priority: getPriorityNumber(data.priority || 'medium'),
      status: 'queued',
      health_before: data.healthBefore || 0,
      executed_at: new Date().toISOString()
    });

  if (error) throw error;
}

async function sendRealtimeNotifications(supabase: any, events: RealtimeEvent[]) {
  const criticalEvents = events.filter(e => 
    e.type === 'repair_triggered' || 
    (e.type === 'system_update' && e.data.status === 'error')
  );

  if (criticalEvents.length > 0) {
    console.log(`🚨 Sending ${criticalEvents.length} critical real-time notifications`);
    
    // Here you could integrate with real-time channels
    // For now, we'll log the critical events
    for (const event of criticalEvents) {
      console.log(`🔔 Critical Event: ${event.type}`, event.data);
    }
  }
}

function getPriorityNumber(priority: string): number {
  const priorities: Record<string, number> = {
    'critical': 1,
    'high': 2,
    'medium': 3,
    'low': 4,
    'absolute': 0,
    'transcendent': 0
  };
  return priorities[priority] || 5;
}