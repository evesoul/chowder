import { Client } from "@notionhq/client";

const notion = new Client({auth: process.env.NOTION_SECRET})

export const getNavList = async () => {
  const { results } = await notion.databases.query({
    database_id: process.env.NAV_DATABASE_ID!,
  })
  return results.map((item: any) => {
    const { properties, icon } = item
    return {
      id: item.id,
      title: properties.name.title[0]?.plain_text || 'Null',
      url: properties.href.url,
      icon: icon?.[icon.type].url,
      tag: properties.tag?.[properties.tag.type]
    }
  })
}
