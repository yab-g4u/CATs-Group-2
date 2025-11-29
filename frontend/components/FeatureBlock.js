export default function FeatureBlock({ icon, title, desc, color = '#0ea5a4' }){
  return (
    <div className="p-4 rounded-lg text-left bg-white shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100" style={{color}}>
          <div className="icon" dangerouslySetInnerHTML={{__html: icon}} />
        </div>
        <div>
          <div className="font-semibold text-gray-800">{title}</div>
          <div className="text-sm text-gray-600 mt-1">{desc}</div>
        </div>
      </div>
    </div>
  )
}
