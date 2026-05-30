import React, { useState } from 'react';
import { Search, PlayCircle, ExternalLink, Filter } from 'lucide-react';
import { VIDEOS } from '../data';

export const VideoLibraryPillar: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(VIDEOS.map(v => v.category)));

  const filteredVideos = VIDEOS.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase()) || 
                         v.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? v.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-10">
      <header className="mb-12">
        <p className="text-sm text-tiande-blue font-serif italic mb-2">Video akademie</p>
        <h2 className="text-5xl font-light tracking-tight text-slate-800">
          Znalostní <span className="font-serif italic text-slate-400">báze</span>
        </h2>
      </header>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input
            type="text"
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded text-xs font-bold uppercase tracking-widest outline-none focus:border-tiande-blue transition-all"
            placeholder="Hledat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="video-search"
          />
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-4 rounded text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
              selectedCategory === null 
                ? 'bg-tiande-blue text-white shadow-lg shadow-blue-100' 
                : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Vše
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-4 rounded text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                selectedCategory === cat 
                  ? 'bg-tiande-blue text-white shadow-lg shadow-blue-100' 
                  : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((video) => (
          <div 
            key={video.id}
            className="group bg-white rounded border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-500"
          >
            <div className="aspect-[16/10] bg-slate-900 relative flex items-center justify-center overflow-hidden">
              <PlayCircle className="w-12 h-12 text-white/30 group-hover:text-white group-hover:scale-110 transition-all z-10" />
              <div className="absolute inset-0 bg-tiande-blue/10 group-hover:bg-transparent transition-all" />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-tiande-blue bg-slate-50 px-2 py-1 rounded">
                  {video.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 leading-tight leading-none tracking-tight">{video.title}</h3>
              <p className="text-slate-500 text-xs mb-6 line-clamp-2 leading-relaxed italic">{video.description}</p>
              <a 
                href={video.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-tiande-blue text-[10px] font-black uppercase tracking-[0.2em] hover:text-tiande-dark transition-all"
              >
                Sledovat Akademii
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium">Nenalezena žádná videa odpovídající vašemu výběru.</p>
        </div>
      )}
    </div>
  );
};
