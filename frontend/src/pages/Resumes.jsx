// src/pages/Resumes.jsx
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const STORAGE_KEY = "jobflow_resumes_demo_v1";
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB demo limit

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeToStorage(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn("Failed to write resumes", e);
  }
}

export default function Resumes() {
  const [files, setFiles] = useState(() => readFromStorage());
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    writeToStorage(files);
  }, [files]);

  // Accept single File or FileList
  const addFiles = (fileList) => {
    if (!fileList) return;
    const toAdd = Array.from(fileList).map((file) => {
      return {
        id: Date.now() + Math.random(),
        name: file.name,
        type: (file.type || "").split("/").pop().toUpperCase() || "FILE",
        createdAt: new Date().toISOString(),
        size: file.size,
        // We will attach dataUrl only for files <= limit to keep localStorage safe
        _file: file, // keep original for reading below
      };
    });

    // read DataURLs for small files only and then save
    toAdd.forEach((meta) => {
      if (meta.size > MAX_FILE_BYTES) {
        // add metadata only (no preview) and warn
        setFiles((p) => [{ ...meta, dataUrl: null }, ...p]);
        alert(`${meta.name} is larger than 10MB — preview won't be stored.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const item = { ...meta, dataUrl: reader.result };
        setFiles((p) => [item, ...p]);
      };
      reader.onerror = () => {
        setFiles((p) => [{ ...meta, dataUrl: null }, ...p]);
      };
      reader.readAsDataURL(meta._file);
    });
  };

  const onFileSelect = (ev) => {
    const f = ev.target.files;
    if (f && f.length) addFiles(f);
    // reset so same file can be selected again
    ev.target.value = "";
  };

  // Drag/drop handlers
  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // must preventDefault to allow drop
    e.dataTransfer.dropEffect = "copy";
    setDragOver(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // when leaving the container, clear state
    setDragOver(false);
  };
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length) {
      addFiles(dt.files);
    }
  };

  const handleDelete = (id) => {
    if (!confirm("Delete this resume?")) return;
    setFiles((p) => p.filter((x) => x.id !== id));
  };

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString();
    } catch {
      return iso;
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen text-text-light-primary dark:text-text-dark-primary">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 flex flex-col ml-64">
          <Header />

          <div className="p-6 sm:p-8 lg:p-10 flex-1">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-[28px] font-extrabold mb-6 text-text-light-primary dark:text-dark-primary">
                Resume Upload Page
              </h1>

              {/* Drop area */}

              {/* Drop area */}
              <div
                onDragEnter={onDragEnter}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                role="button"
                tabIndex={0}
                className={`relative rounded-xl border-2 p-8 flex flex-col items-center justify-center text-center transition-colors ${
                  dragOver
                    ? "border-primary/60 bg-primary/5"
                    : "border-dashed border-border-light bg-white dark:bg-card-dark"
                }`}
                style={{ minHeight: 160 }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    const input = fileInputRef.current;
                    if (input) input.click();
                  }
                }}
              >
                {/* Transparent input covers the entire area so native click always opens file picker.
      We keep it absolutely positioned (not display:none) — this prevents
      browsers from blocking the picker and preserves accessibility. */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={onFileSelect}
                  multiple
                  // absolutely cover the drop area but remain invisible
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  aria-hidden="false"
                />

                <div className="pointer-events-none mb-3">
                  <span className="material-symbols-outlined text-4xl text-text-light-secondary dark:text-dark-secondary">
                    cloud_upload
                  </span>
                </div>

                <p className="pointer-events-none text-text-light-secondary dark:text-dark-secondary mb-4 break-words max-w-lg">
                  Drag and drop your resume here, or click to browse.
                </p>

                {/* Keep a visible button for visual affordance; the invisible input above will receive the click,
      but keeping the button is fine for users who prefer a clear actionable control. */}
                <button
                  type="button"
                  onClick={() => {
                    // fallback — should also work because input is visible to the DOM
                    if (fileInputRef.current) fileInputRef.current.click();
                  }}
                  className="relative z-0 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 shadow-sm"
                >
                  Upload New Resume
                </button>
              </div>

              {/* Uploaded resumes */}
              <h2 className="text-lg font-semibold mt-8 mb-4 text-text-light-primary dark:text-dark-primary">
                Uploaded Resumes
              </h2>

              <div className="rounded-xl overflow-hidden border border-border-light dark:border-border-dark bg-white dark:bg-card-dark">
                <div className="grid grid-cols-[2fr_80px_160px_160px_80px] items-center gap-4 px-6 py-3 bg-[#f5f7f9] dark:bg-slate-800">
                  <div className="text-sm font-semibold text-text-light-primary dark:text-dark-primary">
                    File Name
                  </div>
                  <div className="text-sm font-semibold text-text-light-primary dark:text-dark-primary">
                    Type
                  </div>
                  <div className="text-sm font-semibold text-text-light-primary dark:text-dark-primary">
                    Created Date
                  </div>
                  <div className="text-sm font-semibold text-text-light-primary dark:text-dark-primary">
                    Used In
                  </div>
                  <div className="text-sm font-semibold text-text-light-primary dark:text-dark-primary text-right">
                    Actions
                  </div>
                </div>

                <div>
                  {files.length === 0 ? (
                    <div className="px-6 py-12 text-center text-text-light-secondary dark:text-dark-secondary">
                      No resumes uploaded yet.
                    </div>
                  ) : (
                    files.map((f) => (
                      <div
                        key={f.id}
                        className="grid grid-cols-[2fr_80px_160px_160px_80px] items-center gap-4 px-6 py-4 border-t border-border-light dark:border-border-dark"
                      >
                        <div>
                          <div className="text-text-light-primary dark:text-dark-primary font-medium">
                            {f.name}
                          </div>
                        </div>

                        <div>
                          <div className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-slate-100 dark:bg-slate-700 text-sm font-semibold text-text-light-primary dark:text-dark-primary">
                            {f.type}
                          </div>
                        </div>

                        <div className="text-sm text-text-light-secondary dark:text-dark-secondary">
                          {formatDate(f.createdAt)}
                        </div>

                        <div className="text-sm text-text-light-secondary dark:text-dark-secondary">
                          0 Applications
                        </div>

                        <div className="flex items-center justify-end gap-3">
                          <button
                            type="button"
                            title="Preview"
                            onClick={() => {
                              if (!f.dataUrl)
                                return alert(
                                  "Preview not available for this file."
                                );
                              const w = window.open();
                              if (w) {
                                w.document.write(
                                  `<iframe src="${f.dataUrl}" frameborder="0" style="width:100%;height:100vh"></iframe>`
                                );
                              } else {
                                alert(
                                  "Popup blocked — allow popups for this demo to preview."
                                );
                              }
                            }}
                            className="text-text-light-primary dark:text-dark-primary hover:text-primary"
                          >
                            <span className="material-symbols-outlined">
                              remove_red_eye
                            </span>
                          </button>

                          <a
                            href={f.dataUrl || "#"}
                            download={f.name}
                            title="Download"
                            onClick={(e) => {
                              if (!f.dataUrl) {
                                e.preventDefault();
                                alert(
                                  "Download not available (preview not stored)."
                                );
                              }
                            }}
                            className="text-text-light-primary dark:text-dark-primary hover:text-primary"
                          >
                            <span className="material-symbols-outlined">
                              file_download
                            </span>
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDelete(f.id)}
                            title="Delete"
                            className="text-red-600 hover:text-red-700"
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="px-6 py-4 text-sm text-text-light-secondary dark:text-dark-secondary">
                  Showing {files.length > 0 ? `1 - ${files.length}` : "0"} of{" "}
                  {files.length}
                </div>
              </div>

              <p className="mt-4 text-xs text-text-light-secondary dark:text-dark-secondary max-w-3xl">
                Note: files are stored locally in your browser (data URLs for
                small files). This is a demo convenience — for production,
                upload to a server or use IndexedDB.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
