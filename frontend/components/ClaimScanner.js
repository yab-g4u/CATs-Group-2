import { useState, useRef } from 'react'
import { jsPDF } from 'jspdf'

export default function ClaimScanner(){
  const [image, setImage] = useState(null)
  const [ocr, setOcr] = useState([])
  const canvasRef = useRef()

  function handleFile(e){
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImage(url)
    // stub OCR: simulate extracted lines and charges
    setTimeout(()=>{
      const sample = [
        {line: 'Consultation fee', amount: 500},
        {line: 'Glove fee', amount: 50},
        {line: 'Antibiotics (Amoxicillin)', amount: 1200}
      ]
      setOcr(sample)
    }, 700)
  }

  function generatePdf(){
    // build a PDF dispute letter (stub) using jsPDF
    const doc = new jsPDF()
    doc.setFontSize(12)
    doc.text('To: Ethiopian Ministry of Health', 14, 20)
    doc.text('Subject: Dispute of irregular charges - ClaimCraft generated', 14, 30)
    doc.text('Patient: [NAME]', 14, 40)
    doc.text('Date: ' + new Date().toLocaleDateString(), 14, 48)

    doc.text('Disputed items:', 14, 60)
    let y = 68
    ocr.forEach((item, i)=>{
      doc.text(`${i+1}. ${item.line} — ${item.amount} ETB`, 18, y)
      y += 8
    })

    doc.text('\nI request formal review of these charges for accuracy and legality.\n', 14, y+6)
    const blob = doc.output('blob')
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'claimcraft-dispute.pdf'
    a.click()
  }

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-3">ClaimCraft — Bill scanner demo</h3>
      <input type="file" accept="image/*" onChange={handleFile} />
      {image && <div className="mt-4">
        <img src={image} alt="uploaded" className="max-w-full rounded shadow" />
      </div>}

      <div className="mt-4">
        <h4 className="font-medium">Detected line items</h4>
        <ul className="mt-2 space-y-2">
          {ocr.map((it, idx)=> (
            <li key={idx} className="flex justify-between items-center border p-2 rounded">
              <div>
                <div className="font-medium">{it.line}</div>
                <div className="text-sm text-gray-500">{it.amount} ETB</div>
              </div>
              <div>
                <label className="inline-flex items-center"><input type="checkbox" defaultChecked={it.line.toLowerCase().includes('glove')} /> Flag</label>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="btn btn-primary" onClick={generatePdf}>Generate dispute PDF</button>
        <a className="btn" href="#" onClick={(e)=>{e.preventDefault(); alert('Send to hospital (stub)')}}>Send</a>
      </div>
    </div>
  )
}
