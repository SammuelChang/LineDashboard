export function Step({ phase }: { phase: number }) {
  return (
    <div className="w-10/12 h-20 flex justify-center mx-auto mb-10 text-text">
      <ul className="steps">
        <li data-content={`${phase >= 1 ? "✓" : ""}`} className="step">
          上傳
        </li>
        <li data-content={`${phase >= 2 ? "✓" : ""}`} className="step">
          分析
        </li>
        <li data-content={`${phase >= 3 ? "✓" : ""}`} className="step">
          檢視
        </li>
      </ul>
    </div>
  );
}
