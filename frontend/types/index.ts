export interface MVPRequestPayload {
  userId: string;
  prompt: string;
  projectName: string;
}

export interface MVPResponse {
  success: boolean;
  message: string;
  code?: string;
}

export interface FileEntry {
  filepath: string;
  content: string;
}
