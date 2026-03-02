import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://baysideai.co'
  const contentDir = path.join(process.cwd(), 'src/content/blog')

  const posts: MetadataRoute.Sitemap = []
  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir).filter((f: string) => f.endsWith('.mdx'))
    files.forEach((file: string) => {
      const slug = file.replace(/\.mdx$/, '')
      const { data } = matter(fs.readFileSync(path.join(contentDir, file), 'utf8'))
      posts.push({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(data.date || Date.now()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    })
  }

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    ...posts,
  ]
}
