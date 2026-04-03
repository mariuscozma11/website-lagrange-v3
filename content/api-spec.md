# Content API Specification

Base URL: `/api/v1`

---

## Case Studies

### `GET /case-studies`

List all case studies, supports filtering and pagination.

**Query params:**
| Param    | Type   | Default | Description                                      |
|----------|--------|---------|--------------------------------------------------|
| tag      | string | —       | Filter by tag (e.g. `computer-vision`, `ecommerce`) |
| lang     | string | `en`    | Language (`en`, `ro`)                            |
| page     | number | 1       | Page number                                      |
| limit    | number | 10      | Items per page                                   |

**Response: `200 OK`**
```json
{
  "data": [
    {
      "id": "visual-inspection-ai",
      "slug": "visual-inspection-ai",
      "title": "40% Fewer Defects with AI Visual Inspection",
      "excerpt": "How a furniture manufacturer reduced rejects by 40% using automated visual inspection.",
      "coverImage": "/case-studies/visual-inspection-cover.jpg",
      "tags": ["computer-vision", "ai"],
      "client": "Confidential",
      "industry": "Manufacturing",
      "publishedAt": "2026-02-15T00:00:00Z",
      "featured": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 24,
    "totalPages": 3
  }
}
```

### `GET /case-studies/:slug`

Single case study with full content.

**Response: `200 OK`**
```json
{
  "id": "visual-inspection-ai",
  "slug": "visual-inspection-ai",
  "title": "40% Fewer Defects with AI Visual Inspection",
  "excerpt": "How a furniture manufacturer reduced rejects by 40%...",
  "coverImage": "/case-studies/visual-inspection-cover.jpg",
  "tags": ["computer-vision", "ai"],
  "client": "Confidential",
  "industry": "Manufacturing",
  "duration": "3 months",
  "year": 2025,
  "publishedAt": "2026-02-15T00:00:00Z",
  "featured": true,
  "challenge": "Manual quality inspection on the production line was slow, inconsistent, and missed defects that led to costly returns.",
  "solution": "We deployed a computer vision system using custom-trained YOLO models to inspect products in real-time on the conveyor belt.",
  "results": [
    { "metric": "Defect reduction", "value": "40%" },
    { "metric": "Inspection speed", "value": "3x faster" },
    { "metric": "ROI payback", "value": "4 months" }
  ],
  "technologies": ["TensorFlow", "OpenCV", "Python", "FastAPI", "Docker"],
  "content": "Markdown string with full case study body...",
  "images": [
    { "url": "/case-studies/visual-inspection-1.jpg", "alt": "Production line camera setup", "caption": "Camera mounted above conveyor belt" },
    { "url": "/case-studies/visual-inspection-2.jpg", "alt": "Detection dashboard", "caption": "Real-time defect dashboard" }
  ],
  "testimonial": {
    "quote": "The system paid for itself in under 4 months.",
    "author": "Production Manager",
    "company": "Confidential"
  },
  "relatedSlugs": ["ocr-document-processing", "predictive-maintenance"]
}
```

---

## Demos

### `GET /demos`

List interactive demos / proof of concepts.

**Query params:**
| Param    | Type   | Default | Description                         |
|----------|--------|---------|-------------------------------------|
| tag      | string | —       | Filter by tag                       |
| lang     | string | `en`    | Language                            |

**Response: `200 OK`**
```json
{
  "data": [
    {
      "id": "ocr-live",
      "slug": "ocr-live",
      "title": "Live OCR Demo",
      "description": "Upload a document and see text extraction in real-time.",
      "thumbnail": "/demos/ocr-thumb.jpg",
      "tags": ["ocr", "ai"],
      "type": "interactive",
      "externalUrl": null,
      "publishedAt": "2026-03-01T00:00:00Z"
    }
  ]
}
```

### `GET /demos/:slug`

Single demo detail.

**Response: `200 OK`**
```json
{
  "id": "ocr-live",
  "slug": "ocr-live",
  "title": "Live OCR Demo",
  "description": "Upload a document and see text extraction in real-time.",
  "longDescription": "This demo uses our OCR pipeline to extract structured data from uploaded documents...",
  "thumbnail": "/demos/ocr-thumb.jpg",
  "tags": ["ocr", "ai"],
  "type": "interactive",
  "externalUrl": null,
  "embedUrl": null,
  "technologies": ["Hugging Face", "FastAPI", "Python"],
  "relatedCaseStudySlugs": ["ocr-document-processing"],
  "publishedAt": "2026-03-01T00:00:00Z"
}
```

---

## Blog Posts

### `GET /blog`

List blog posts with pagination and filtering.

**Query params:**
| Param    | Type   | Default | Description                              |
|----------|--------|---------|------------------------------------------|
| category | string | —       | Filter by category (e.g. `engineering`, `ai`, `company`) |
| tag      | string | —       | Filter by tag                            |
| lang     | string | `en`    | Language                                 |
| page     | number | 1       | Page number                              |
| limit    | number | 10      | Items per page                           |
| search   | string | —       | Full-text search on title and excerpt    |

**Response: `200 OK`**
```json
{
  "data": [
    {
      "id": "react-native-vs-flutter",
      "slug": "react-native-vs-flutter-2026",
      "title": "React Native vs Flutter in 2026: A Practical Comparison",
      "excerpt": "We've shipped production apps with both. Here's what we actually think.",
      "coverImage": "/blog/rn-vs-flutter-cover.jpg",
      "category": "engineering",
      "tags": ["react-native", "flutter", "mobile"],
      "author": {
        "name": "Marius Cozma",
        "avatar": "/team/marius.jpg",
        "role": "Founder"
      },
      "readingTime": 8,
      "publishedAt": "2026-03-20T00:00:00Z",
      "updatedAt": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5
  }
}
```

### `GET /blog/:slug`

Single blog post with full content.

**Response: `200 OK`**
```json
{
  "id": "react-native-vs-flutter",
  "slug": "react-native-vs-flutter-2026",
  "title": "React Native vs Flutter in 2026: A Practical Comparison",
  "excerpt": "We've shipped production apps with both. Here's what we actually think.",
  "coverImage": "/blog/rn-vs-flutter-cover.jpg",
  "category": "engineering",
  "tags": ["react-native", "flutter", "mobile"],
  "author": {
    "name": "Marius Cozma",
    "avatar": "/team/marius.jpg",
    "role": "Founder"
  },
  "readingTime": 8,
  "publishedAt": "2026-03-20T00:00:00Z",
  "updatedAt": null,
  "content": "Markdown string with full blog post body...",
  "tableOfContents": [
    { "id": "performance", "title": "Performance", "level": 2 },
    { "id": "developer-experience", "title": "Developer Experience", "level": 2 },
    { "id": "ecosystem", "title": "Ecosystem", "level": 2 },
    { "id": "verdict", "title": "Our Verdict", "level": 2 }
  ],
  "relatedSlugs": ["building-offline-first-apps", "our-mobile-stack"]
}
```

---

## Shared

### Tags (used across all content types)
```
ai, computer-vision, ocr, speech-recognition, llm,
web-applications, ecommerce, cms, lms, marketing-sites, desktop-applications,
cross-platform, offline-first, native-features, app-deployment,
engineering, company, tutorial, opinion
```

### Error format
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### Status codes
| Code | Usage                        |
|------|------------------------------|
| 200  | Success                      |
| 400  | Bad request / invalid params |
| 404  | Resource not found           |
| 500  | Server error                 |
