export interface Product {
  id: string;
  name: string;
  category: string;
  line: string;
  description: string;
  usage: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
}

export type Pillar = 'recommendations' | 'products' | 'content' | 'videos' | 'objections' | 'education' | 'diagnosis' | 'hooks' | 'scripts' | 'storycookbook' | 'calculator' | 'reactivation' | 'mailing' | 'portal';

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}
