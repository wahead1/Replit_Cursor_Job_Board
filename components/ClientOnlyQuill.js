import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p>Loading editor...</p>
})

export default function ClientOnlyQuill({ value, onChange }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <textarea value={value} onChange={(e) => onChange(e.target.value)} />
  }

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
    />
  )
}