import { supabase } from './supabase';

export interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GroqOptions {
  model?: string;
  temperature?: number;
}

export const groq = {
  async chat(messages: GroqMessage[], options: GroqOptions = {}) {
    try {
      const { data, error } = await supabase.functions.invoke('groq-ai', {
        body: {
          messages,
          ...options,
        },
      });

      if (!error) return data;
      
      // If Edge Function fails, check for local key fallback
      const localKey = import.meta.env.VITE_GROQ_API_KEY;
      if (localKey) {
        console.warn('Edge Function failed, falling back to direct Groq API call...');
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages,
            model: options.model || 'llama-3.3-70b-versatile',
            temperature: options.temperature || 0.7,
          }),
        });
        return await response.json();
      }

      console.error('Groq AI Error (Edge Function):', error);
      throw new Error('Failed to connect to AI service. Please ensure the Supabase Edge Function is deployed or VITE_GROQ_API_KEY is set in your .env file.');
    } catch (err: any) {
      // Catch network errors (like "Failed to fetch" when function doesn't exist)
      const localKey = import.meta.env.VITE_GROQ_API_KEY;
      if (localKey) {
        console.warn('Network error to Edge Function, falling back to direct Groq API call...');
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages,
            model: options.model || 'llama-3.3-70b-versatile',
            temperature: options.temperature || 0.7,
          }),
        });
        return await response.json();
      }
      throw err;
    }
  },
};
