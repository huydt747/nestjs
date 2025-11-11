import React from "react";

export const Footer: React.FC = () =>
  React.createElement(
    "footer",
    {
      className:
        "w-full bg-neutral-900 text-neutral-400 text-sm border-t border-neutral-800 py-5",
    },
    [
      // Nội dung chính
      React.createElement(
        "div",
        {
          key: "content",
          className:
            "max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6 items-start",
        },
        [
          // Left column — Giới thiệu
          React.createElement(
            "div",
            { key: "intro", className: "md:col-span-2 md:pr-4" },
            [
              React.createElement(
                "h3",
                { className: "text-white font-semibold mb-4" },
                "MEO FORUM"
              ),
              React.createElement(
                "p",
                { className: "text-neutral-500 leading-relaxed" },
                "Nơi chia sẻ, đọc báo, nhắn tin và bàn luận về mọi chủ đề trong cộng đồng."
              ),
            ]
          ),

          // Middle column — spacer (left empty)
          React.createElement(
            "div",
            { key: "spacer", className: "hidden md:block md:col-span-1" },
            []
          ),

          // Right column — Liên kết nhanh
          React.createElement(
            "div",
            { key: "links", className: "md:col-span-1 flex flex-col md:items-end items-center mb-4" },
            [
              React.createElement(
                "div",
                { key: "links-box", className: "w-full max-w-xs text-left" },
                [
                  React.createElement(
                    "h4",
                    { className: "text-white font-semibold mb-3 uppercase tracking-wide" },
                    "Liên kết nhanh"
                  ),
                  React.createElement(
                    "ul",
                    { className: "flex flex-col gap-2 list-none pl-0 ml-0 text-left" },
                    [
                      ["Video Games", "/Video_Games"],
                      ["Japanese Culture", "/Japanese_Culture"],
                      ["Creative", "/Creative"],
                      ["Interests", "/Interests"],
                      ["Other", "/Other"],
                    ].map(([label, href]) =>
                      React.createElement(
                        "li",
                        { key: href },
                        React.createElement(
                          "a",
                          { href, className: "hover:text-white transition-colors duration-200" },
                          label
                        )
                      )
                    )
                  ),
                ]
              ),
            ]
          ),
        ]
      ),

      // Dòng bản quyền
      React.createElement(
        "div",
        {
          key: "copyright",
          className:
            "border-t border-neutral-800 text-center pt-4 text-xs text-neutral-600",
        },
        "© 2025 MEO FORUM — Một dự án cộng đồng, không liên quan đến voz.vn."
      ),
    ]
  );
