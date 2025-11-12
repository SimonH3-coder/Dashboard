async function fetchAPI(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    return await res.json()
  } catch (err) {
    console.error(`❌ Failed to fetch ${url}:`, err.message)
    return null
  }
}