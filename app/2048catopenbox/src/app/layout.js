import './globals.css';

export const metadata = {
  title: '2048貓咪開箱傳說',
  description: '結合開箱掛機與2048的網頁遊戲',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
//git add .
//git commit -m "fix:"
//git push
//Get-ChildItem -Recurse -Exclude "node_modules", ".next", ".git" | Select-Object @{Name="路徑"; Expression={$_.FullName.Replace((Get-Location).Path, "")}}

