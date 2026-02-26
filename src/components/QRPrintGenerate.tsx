'use client'

import React from 'react'
import QRCode from 'qrcode'

export const QRPrintGenerate = ({ data }: any) => {

  const generateQRImage = async (text: string) => {
    return await QRCode.toDataURL(text)
  }

  const printAll = async () => {
    if (!data?.tablecollections?.sections) {
      alert('No tables found')
      return
    }

    const printWindow = window.open('', '_blank')

    let html = ''

    for (const section of data.tablecollections.sections) {
      for (let i = 1; i <= section.tablecount; i++) {

        const tableId =
          section.sectionTitle.toLowerCase().replace(/\s+/g, '-') +
          `-table-${i}`

        const qrUrl = `${data.qrConfig.baseurl}${tableId}`

        const qrImage = await generateQRImage(qrUrl)

        html += `
          <div style="text-align:center;margin:20px;display:inline-block">
            <img src="${qrImage}" width="200"/>
            <h3>${section.sectionTitle} Table ${i}</h3>
          </div>
        `
      }
    }

    printWindow?.document.write(html)
    printWindow?.print()
  }

  const downloadAll = async () => {

    for (const section of data.tablecollections.sections) {
      for (let i = 1; i <= section.tablecount; i++) {

        const tableId =
          section.sectionTitle.toLowerCase().replace(/\s+/g, '-') +
          `-table-${i}`

        const qrUrl = `${data.qrConfig.baseurl}${tableId}`

        const qrImage = await generateQRImage(qrUrl)

        const link = document.createElement('a')
        link.href = qrImage
        link.download = `${tableId}.png`
        link.click()
      }
    }
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <button onClick={printAll} style={{ marginRight: 10 }}>
        🖨 Print QR Codes
      </button>

      <button onClick={downloadAll}>
        ⬇ Download QR Codes
      </button>
    </div>
  )
}