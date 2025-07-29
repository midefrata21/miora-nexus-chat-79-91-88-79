import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SyncRequest {
  action: 'sync_all' | 'sync_systems' | 'sync_metrics' | 'sync_logs' | 'cleanup';
  data?: any;
  timestamp?: number;
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

    const { action, data, timestamp }: SyncRequest = await req.json();
    console.log(`🔄 MIORA Database Sync Request: ${action}`, { timestamp });

    let result: any = {};

    switch (action) {
      case 'sync_all':
        result = await syncAllData(supabase, data);
        break;
      
      case 'sync_systems':
        result = await syncSystemsData(supabase, data);
        break;
      
      case 'sync_metrics':
        result = await syncMetricsData(supabase, data);
        break;
      
      case 'sync_logs':
        result = await syncLogsData(supabase, data);
        break;
      
      case 'cleanup':
        result = await performDatabaseCleanup(supabase);
        break;
      
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    console.log(`✅ MIORA Database Sync Completed: ${action}`, result);

    return new Response(
      JSON.stringify({
        success: true,
        action,
        result,
        timestamp: Date.now()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('❌ MIORA Database Sync Error:', error);
    
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

async function syncAllData(supabase: any, data: any) {
  console.log('🚀 Starting complete MIORA database synchronization...');
  
  const results = {
    systems: 0,
    metrics: 0,
    logs: 0,
    tasks: 0,
    repairs: 0
  };

  // Sync MIORA systems
  if (data.systems) {
    for (const system of data.systems) {
      const { error } = await supabase
        .from('miora_systems')
        .upsert({
          system_id: system.id,
          name: system.name,
          type: system.type || 'autonomous',
          status: system.isActive ? 'active' : 'inactive',
          performance_score: system.performanceScore || 0,
          last_activity: new Date().toISOString(),
          capabilities: system.capabilities || [],
          error_count: system.errorCount || 0,
          optimization_count: system.optimizationCount || 0
        }, { onConflict: 'system_id' });

      if (!error) results.systems++;
    }
  }

  // Sync metrics
  if (data.metrics) {
    for (const metric of data.metrics) {
      const { error } = await supabase
        .from('miora_system_metrics')
        .insert({
          system_id: metric.systemId,
          metric_type: metric.type,
          value: metric.value,
          unit: metric.unit || 'count',
          metadata: metric.metadata || {}
        });

      if (!error) results.metrics++;
    }
  }

  // Sync autonomous tasks
  if (data.tasks) {
    for (const task of data.tasks) {
      const { error } = await supabase
        .from('miora_autonomous_tasks')
        .upsert({
          task_id: task.id,
          name: task.description || 'Autonomous Task',
          type: task.type,
          description: task.description,
          status: task.status,
          priority: getPriorityNumber(task.priority),
          progress: task.progress || 0,
          result: task.result || {},
          auto_generated: true
        }, { onConflict: 'task_id' });

      if (!error) results.tasks++;
    }
  }

  console.log('✅ Complete sync finished:', results);
  return results;
}

async function syncSystemsData(supabase: any, systems: any[]) {
  console.log(`🔧 Syncing ${systems?.length || 0} MIORA systems...`);
  
  let syncedCount = 0;
  
  if (systems) {
    for (const system of systems) {
      const { error } = await supabase
        .from('miora_systems')
        .upsert({
          system_id: system.id,
          name: system.name,
          type: system.type || 'autonomous',
          status: system.isActive ? 'active' : 'inactive',
          performance_score: system.performanceScore || 0,
          last_activity: new Date().toISOString(),
          capabilities: system.capabilities || [],
          activation_count: system.activationCount || 0,
          total_runtime_seconds: system.totalRuntime || 0,
          error_count: system.errorCount || 0,
          optimization_count: system.optimizationCount || 0
        }, { onConflict: 'system_id' });

      if (!error) syncedCount++;
    }
  }

  return { synced: syncedCount };
}

async function syncMetricsData(supabase: any, metrics: any[]) {
  console.log(`📊 Syncing ${metrics?.length || 0} system metrics...`);
  
  let syncedCount = 0;
  
  if (metrics) {
    for (const metric of metrics) {
      const { error } = await supabase
        .from('miora_system_metrics')
        .insert({
          system_id: metric.systemId || 'miora-core',
          metric_type: metric.type,
          value: metric.value,
          unit: metric.unit || 'count',
          metadata: {
            source: 'miora-sync',
            category: metric.category || 'performance',
            ...metric.metadata
          }
        });

      if (!error) syncedCount++;
    }
  }

  return { synced: syncedCount };
}

async function syncLogsData(supabase: any, logs: any[]) {
  console.log(`📝 Syncing ${logs?.length || 0} system logs...`);
  
  let syncedCount = 0;
  
  if (logs) {
    for (const log of logs) {
      const { error } = await supabase
        .from('miora_system_logs')
        .insert({
          system_id: log.systemId || 'miora-core',
          level: log.level || 'info',
          category: log.category || 'system',
          message: log.message,
          event_type: log.eventType || 'sync',
          metadata: {
            source: 'miora-sync',
            ...log.metadata
          }
        });

      if (!error) syncedCount++;
    }
  }

  return { synced: syncedCount };
}

async function performDatabaseCleanup(supabase: any) {
  console.log('🧹 Performing MIORA database cleanup...');
  
  const results = {
    oldLogs: 0,
    oldMetrics: 0,
    completedTasks: 0
  };

  // Clean old logs (older than 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const { count: logsDeleted } = await supabase
    .from('miora_system_logs')
    .delete()
    .lt('timestamp', thirtyDaysAgo.toISOString());
  
  results.oldLogs = logsDeleted || 0;

  // Clean old metrics (older than 7 days, keep only summary)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const { count: metricsDeleted } = await supabase
    .from('miora_system_metrics')
    .delete()
    .lt('timestamp', sevenDaysAgo.toISOString());
  
  results.oldMetrics = metricsDeleted || 0;

  // Archive completed tasks older than 3 days
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  
  const { count: tasksArchived } = await supabase
    .from('miora_autonomous_tasks')
    .delete()
    .eq('status', 'completed')
    .lt('created_at', threeDaysAgo.toISOString());
  
  results.completedTasks = tasksArchived || 0;

  console.log('✅ Database cleanup completed:', results);
  return results;
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
