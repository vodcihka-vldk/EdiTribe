// TypeScript declaration for Electron preload API

interface ElectronAPI {
  openFolderDialog: () => Promise<any[]>;
  getWavsFromFolder: (folderPath: string) => Promise<any[]>;
  getAppVersion: () => Promise<string>;
  openE2sAllDialog: () => Promise<{
    ok: boolean;
    canceled?: boolean;
    filePath?: string;
    samples: Array<{
      slot: number;
      name: string;
      path: string;
      size: number;
      sampleRate?: number;
      bitDepth?: number;
      channels?: number;
      duration?: number;
      sourceKind?: string;
      sourceAllPath?: string;
      sourceOffset?: number;
      sourceLength?: number;
    }>;
    warnings?: string[];
    message?: string;
  }>;
  getE2sEmbeddedAudioDataUrl: (payload: {
    sourceAllPath?: string;
    sourceOffset?: number;
    sourceLength?: number;
  }) => Promise<{
    ok: boolean;
    dataUrl?: string;
    message?: string;
  }>;
  trimAudioFile: (payload: {
    sourcePath: string;
    startSec: number;
    endSec: number;
    sampleName?: string;
  }) => Promise<{
    ok: boolean;
    path?: string;
    size?: number;
    duration?: number;
    sampleRate?: number;
    bitDepth?: number;
    channels?: number;
    message?: string;
  }>;
  estimateExportAutotrim: (payload: {
    shouldConvert: boolean;
    conversion?: {
      format?: string;
      sampleRate?: number;
      bitDepth?: number;
      channels?: number;
      type?: string;
      volume?: string;
    };
    samples: Array<{
      index: number;
      name: string;
      path: string;
      sourceKind?: string;
      sourceAllPath?: string;
      sourceOffset?: number;
      sourceLength?: number;
    }>;
  }) => Promise<{
    ok: boolean;
    message?: string;
    estimates: Array<{
      index: number;
      trimRatio: number;
      trimmedDurationSec: number;
    }>;
  }>;
  chooseExportDirectory: () => Promise<string | null>;
  exportE2sAll: (payload: {
    outputDirectory: string;
    fileName: string;
    exportMode?: 'e2s-all' | 'placeholder-sort';
    shouldConvert: boolean;
    conversion: {
      format: string;
      sampleRate: number;
      bitDepth: number;
      channels: number;
      type: string;
      volume: string;
    };
    samples: Array<{
      slot: number;
      name: string;
      path: string;
      size: number;
      category?: string;
      exportType?: string;
      sourceKind?: string;
      sourceAllPath?: string;
      sourceOffset?: number;
      sourceLength?: number;
    }>;
  }) => Promise<{
    ok: boolean;
    outPath?: string;
    warnings?: string[];
    message?: string;
    issueDetails?: Array<{
      slot: number | null;
      sample: string;
      reason: string;
      kind?: 'slot' | 'source' | 'layout' | 'other';
    }>;
    summary?: {
      shouldConvert?: boolean;
      conversion?: {
        format?: string;
        sampleRate?: number;
        bitDepth?: number;
        channels?: number;
        type?: string;
        volume?: string;
      };
      sampleCount?: number;
      requestedSamples?: number;
      uniqueSlotAssignments?: number;
      writtenSamples?: number;
      firstWrittenSlot?: number | null;
      lastWrittenSlot?: number | null;
    };
  }>;
  saveAudioBufferAsWav: (payload: { nameBase: string; data: ArrayBuffer }) => Promise<{
    ok: boolean;
    path?: string;
    size?: number;
    message?: string;
  }>;
  extractEmbeddedSampleToTemp: (payload: {
    sourceAllPath?: string;
    sourceOffset?: number;
    sourceLength?: number;
    sampleName?: string;
  }) => Promise<{
    ok: boolean;
    path?: string;
    duration?: number;
    sampleRate?: number;
    bitDepth?: number;
    channels?: number;
    message?: string;
  }>;
}

interface Window {
  electronAPI?: ElectronAPI;
}

declare var window: Window;
