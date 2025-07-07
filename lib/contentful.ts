import { createClient } from "contentful"

// This would be replaced with your actual Contentful space ID and access token
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "your-space-id",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "your-access-token",
})

export interface Pet {
  id: string
  name: string
  type: string
  breed: string
  age: string
  gender: string
  description: string
  image: string
  status: string
}

export interface Story {
  id: string
  title: string
  content: string
  image: string
  petName: string
  petType: string
  adopter: {
    name: string
    image: string
    location: string
  }
  date: string
}

export async function getPets(): Promise<Pet[]> {
  try {
    const response = await client.getEntries({
      content_type: "pet",
    })

    return response.items.map((item: any) => ({
      id: item.sys.id,
      name: item.fields.name,
      type: item.fields.type,
      breed: item.fields.breed,
      age: item.fields.age,
      gender: item.fields.gender,
      description: item.fields.description,
      image: item.fields.image?.fields?.file?.url || "/placeholder.svg",
      status: item.fields.status,
    }))
  } catch (error) {
    console.error("Error fetching pets from Contentful:", error)
    return []
  }
}

export async function getStories(): Promise<Story[]> {
  try {
    const response = await client.getEntries({
      content_type: "story",
    })

    return response.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      content: item.fields.content,
      image: item.fields.image?.fields?.file?.url || "/placeholder.svg",
      petName: item.fields.petName,
      petType: item.fields.petType,
      adopter: {
        name: item.fields.adopterName,
        image: item.fields.adopterImage?.fields?.file?.url || "/placeholder.svg",
        location: item.fields.adopterLocation,
      },
      date: new Date(item.fields.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }))
  } catch (error) {
    console.error("Error fetching stories from Contentful:", error)
    return []
  }
}
