import React from 'react';

interface APIKeyInstructionsProps {
  isBingX: boolean;
  needsPassphrase: boolean;
}

export const APIKeyInstructions: React.FC<APIKeyInstructionsProps> = ({
  isBingX,
  needsPassphrase
}) => {
  return (
    <div className="text-xs text-gray-400 mb-3">
      {isBingX ? (
        <>
          <p>Masukkan API Key dan Secret Key BingX untuk akses data real-time</p>
          <p className="text-yellow-400 mt-1">• Buat API Key di BingX Dashboard → API Management</p>
          <p className="text-yellow-400">• Pastikan hanya mengaktifkan permission "Read"</p>
        </>
      ) : (
        <>
          <p>Masukkan API Key dan Secret Key untuk mengakses data real-time dengan rate limit yang lebih tinggi</p>
          {needsPassphrase && (
            <p className="text-yellow-400 mt-1">• OKX memerlukan passphrase tambahan</p>
          )}
        </>
      )}
    </div>
  );
};