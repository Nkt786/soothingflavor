// Structured Data for JSON-LD
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Organization Schema
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Soothing Flavor",
    "url": "https://soothingflavor.com",
    "logo": "https://soothingflavor.com/logo.png",
    "description": "Chef-crafted, nutritionist-designed meals delivered fresh",
             "address": {
           "@type": "PostalAddress",
           "addressLocality": "Nagpur",
           "addressCountry": "IN"
         },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-98765-43210",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://facebook.com/soothingflavor",
      "https://instagram.com/soothingflavor",
      "https://twitter.com/soothingflavor"
    ]
  }

  return <StructuredData data={schema} />
}

// Website Schema
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Soothing Flavor",
    "url": "https://soothingflavor.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://soothingflavor.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return <StructuredData data={schema} />
}
