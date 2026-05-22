/**
 * Upload the skills library bundle to Vercel Blob.
 *
 * Usage:
 *   npx tsx scripts/upload-skills-bundle.ts [/optional/path/to/skills-library]
 *
 * The source path can also be set via the SKILLS_SOURCE_PATH environment variable.
 * The BLOB_READ_WRITE_TOKEN environment variable must be set.
 *
 * After running, copy the printed SKILLS_BUNDLE_URL value into your environment.
 */

import { put } from '@vercel/blob'
import { execSync } from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'

const DEFAULT_SOURCE = path.resolve(__dirname, '..', '..', 'bayside-staging', 'skills-library')

const sourcePath =
  process.env.SKILLS_SOURCE_PATH ||
  process.argv[2] ||
  DEFAULT_SOURCE

const bundlePath = path.join(os.tmpdir(), 'bayside-skills-library.zip')

async function main() {
  console.log('Source:', sourcePath)
  console.log('Bundle:', bundlePath)

  if (!fs.existsSync(sourcePath)) {
    console.error(`Source path not found: ${sourcePath}`)
    console.error('Pass the path as a CLI argument or set SKILLS_SOURCE_PATH.')
    process.exit(1)
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('BLOB_READ_WRITE_TOKEN is required.')
    console.error('Set it in your environment before running this script.')
    process.exit(1)
  }

  // Remove any previous bundle
  if (fs.existsSync(bundlePath)) {
    fs.unlinkSync(bundlePath)
  }

  // Build the zip from the source directory
  console.log('\nBuilding zip bundle...')
  try {
    execSync(`zip -r "${bundlePath}" .`, { cwd: sourcePath, stdio: 'inherit' })
  } catch {
    console.error('zip failed. Make sure the zip command is available on this system.')
    process.exit(1)
  }

  const sizeKb = (fs.statSync(bundlePath).size / 1024).toFixed(1)
  console.log(`Bundle created: ${sizeKb} KB`)

  // Upload to Vercel Blob
  console.log('\nUploading to Vercel Blob...')
  const content = fs.readFileSync(bundlePath)

  const blob = await put('skills-library/bundle.zip', content, {
    access: 'public',
    contentType: 'application/zip',
    addRandomSuffix: false,
  })

  console.log('\nUpload complete.')
  console.log('Blob URL:', blob.url)
  console.log('\nAdd this to your environment variables:')
  console.log(`SKILLS_BUNDLE_URL=${blob.url}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
