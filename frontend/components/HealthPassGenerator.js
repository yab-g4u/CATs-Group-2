import { useState } from 'react'
import QRCode from 'qrcode'

export default function HealthPassGenerator(){
  const [patientId, setPatientId] = useState('P-12345')
  const [key, setKey] = useState('sk_live_abc123')
  const [pointer, setPointer] = useState('https://cloud.example.com/patient/P-12345')
  const [qr, setQr] = useState('')

  async function generate(){
    const payload = { patientId, key, pointer }
    const text = JSON.stringify(payload)
    const dataUrl = await QRCode.toDataURL(text, { margin: 1, width: 240 })
    setQr(dataUrl)
  }

  function validateFromInput(text){
    try{
      const parsed = JSON.parse(text)
      return { ok: true, parsed }
    }catch(e){
      return { ok: false }
    }
  }

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-3">HealthPass — QR generator</h3>
      <label className="block mb-2 text-sm">Patient ID</label>
      <input value={patientId} onChange={e=>setPatientId(e.target.value)} className="w-full p-2 border rounded mb-3" />
      <label className="block mb-2 text-sm">Encrypted key (example)</label>
      <input value={key} onChange={e=>setKey(e.target.value)} className="w-full p-2 border rounded mb-3" />
      <label className="block mb-2 text-sm">Pointer to timeline</label>
      <input value={pointer} onChange={e=>setPointer(e.target.value)} className="w-full p-2 border rounded mb-3" />
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={generate}>Generate QR</button>
      </div>

      {qr && <div className="mt-4 text-center">
        <img src={qr} alt="qr" className="mx-auto" />
        <div className="text-sm text-gray-500 mt-2">Scan or save this QR</div>
      </div>}

      <section className="mt-6">
        <h4 className="font-medium">Validate QR / Paste content</h4>
        <textarea placeholder='{"patientId":"P-12345","key":"...","pointer":"..."}' className="w-full p-2 border rounded mt-2" rows={4} onBlur={(e)=>{
          const res = validateFromInput(e.target.value)
          if (!res.ok) alert('Invalid QR content')
          else alert('Valid QR content: ' + JSON.stringify(res.parsed))
        }} />
      </section>
    </div>
  )
}
