import { getNavList } from "@/lib/notion";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";

const _getNavList = cache(getNavList);
export default async function Nav() {
  const navList = await _getNavList();

  return (
    <div>
      {navList.map((item) => {
        return (
          <Link
            key={item.id}
            className="flex items-center gap-4 m-2 p-4 hover:bg-slate-100 rounded-md"
            href={item.url}
          >
            <Image
              src={item.icon}
              width={32}
              height={32}
              alt={""}
              unoptimized
            />
            <div>
              <div className="font-semibold mb-1">{item.title}</div>
              {item.tag.map((tag: {id: string, name: string, color: string}) => (
                <div
                  key={tag.id}
                >
                  {tag.name}
                </div>
              ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
