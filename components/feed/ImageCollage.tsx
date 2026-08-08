"use client";

import React, { useState } from "react";
import { X, ZoomIn } from "lucide-react";

export interface ImageCollageProps {
  images: string[];
}

export function ImageCollage({ images }: ImageCollageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  const count = images.length;

  return (
    <>
      {/* 1 Image Layout */}
      {count === 1 && (
        <div
          onClick={() => setSelectedImage(images[0])}
          className="relative h-52 sm:h-72 w-full rounded-xl overflow-hidden border border-slate-200/90 bg-slate-100 cursor-pointer group shadow-xs active:scale-[0.99] transition-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[0]}
            alt="Proof of work screenshot"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-slate-900/60 text-white backdrop-blur-xs opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="h-3.5 w-3.5" />
          </div>
        </div>
      )}

      {/* 2 Images Layout */}
      {count === 2 && (
        <div className="grid grid-cols-2 gap-1.5 h-48 sm:h-64 w-full rounded-xl overflow-hidden border border-slate-200/90 shadow-xs">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(img)}
              className="relative h-full w-full bg-slate-100 overflow-hidden cursor-pointer group active:scale-[0.98] transition-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`Proof photo ${idx + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}

      {/* 3 Images Layout */}
      {count === 3 && (
        <div className="grid grid-cols-3 gap-1.5 h-52 sm:h-72 w-full rounded-xl overflow-hidden border border-slate-200/90 shadow-xs">
          <div
            onClick={() => setSelectedImage(images[0])}
            className="col-span-2 h-full w-full bg-slate-100 overflow-hidden cursor-pointer group active:scale-[0.98] transition-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[0]}
              alt="Main proof photo"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="col-span-1 grid grid-rows-2 gap-1.5 h-full">
            {images.slice(1, 3).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                className="relative h-full w-full bg-slate-100 overflow-hidden cursor-pointer group active:scale-[0.98] transition-transform"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`Proof photo ${idx + 2}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4+ Images Layout */}
      {count >= 4 && (
        <div className="grid grid-cols-2 grid-rows-2 gap-1.5 h-56 sm:h-76 w-full rounded-xl overflow-hidden border border-slate-200/90 shadow-xs">
          {images.slice(0, 4).map((img, idx) => {
            const extraCount = count - 4;
            const isLastTile = idx === 3 && extraCount > 0;

            return (
              <div
                key={idx}
                onClick={() => setSelectedImage(img)}
                className="relative h-full w-full bg-slate-100 overflow-hidden cursor-pointer group active:scale-[0.98] transition-transform"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={`Proof photo ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {isLastTile && (
                  <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[2px] flex items-center justify-center font-extrabold text-white text-base sm:text-lg">
                    +{extraCount + 1} More
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Full-Screen Mobile Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 cursor-pointer animate-in fade-in duration-200"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-slate-800/90 text-white hover:bg-slate-700 transition-colors shadow-lg"
            title="Close Lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative max-w-4xl w-full max-h-[88vh] rounded-2xl overflow-hidden shadow-2xl bg-black flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={selectedImage} alt="Expanded proof image" className="max-w-full max-h-[85vh] object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
