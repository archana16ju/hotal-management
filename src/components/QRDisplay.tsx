'use client'

import React from 'react'
import { Button } from '@payloadcms/ui'

const QRDisplay = ({ document, collection }: any) => {
  const id = document?.id
  const collectionSlug = collection?.slug

  if (!id) {
    return <div>Save document first</div>
  }

  const qrUrl = `/api/qr/${collectionSlug}/${id}`

  const handlePrint = () => {
    const win = window.open('', '_blank')
    if (!win) return

    win.document.write(`<img src="${qrUrl}" onload="window.print();window.close();" />`)
    win.document.close()
  }

  const handleDownload = async () => {
    const res = await fetch(qrUrl)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `qr-${id}.png`
    a.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 20 }}>
      <img src={qrUrl} width={200} height={200} />

      <div style={{ marginTop: 10 }}>
        <Button onClick={handlePrint}>Print</Button>
        <Button onClick={handleDownload}>Download</Button>
      </div>
    </div>
  )
}

export default QRDisplay