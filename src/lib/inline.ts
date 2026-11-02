// Turns a one-line string from the CMS into safe inline HTML. Editors get
// three marks and nothing else: **bold**, ==highlight== (the word takes the
// card's domain colour) and [link text](/url). Everything else is escaped.
export function inline(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/==(.+?)==/g, '<b class="hl">$1</b>')
    .replace(/\[(.+?)\]\(([^)\s"]+)\)/g, '<a href="$2">$1</a>');
}
