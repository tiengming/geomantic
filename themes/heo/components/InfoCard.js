import { siteConfig } from '@/lib/config'
import { ArrowRightCircle, GlobeAlt } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CONFIG from '../config'
import Announcement from './Announcement'
import Card from './Card'

/**
 * 社交信息卡
 * @param {*} props
 * @returns
 */
export function InfoCard(props) {
  const { siteInfo, notice } = props
  const router = useRouter()
  // 在文章详情页特殊处理
  const isSlugPage = router.pathname.indexOf('/[prefix]') === 0
  return (
        <Card className='bg-[#4f65f0] dark:bg-yellow-600 text-white flex flex-col w-72 overflow-hidden relative'>
            {/* 信息卡牌第一行 */}
            <div className='flex justify-between'>
                {/* 问候语 */}
                <GreetingsWords />
                <div className={`${isSlugPage ? 'absolute right-0 -mt-8 -mr-6 hover:opacity-0 hover:scale-150 blur' : 'cursor-pointer'} justify-center items-center flex dark:text-gray-100 transform transitaion-all duration-200`}>
                    <LazyImage src={siteInfo?.icon} className='rounded-full' width={isSlugPage ? 100 : 28} alt={siteConfig('AUTHOR')} />
                </div>
            </div>

            <h2 className='text-3xl font-extrabold mt-3'>
                {siteConfig('AUTHOR')}
            </h2>

            {/* 公告栏 */}
            <div>
                <Announcement post={notice} style={{ color: 'white !important' }} />
            </div>

            <div className='flex justify-between'>
                <div className='flex space-x-3  hover:text-black dark:hover:text-white'>
                    {/* 两个社交按钮 */}
                    <div className='bg-indigo-400 p-2 rounded-full  transition-colors duration-200 dark:bg-yellow-500 dark:hover:bg-black hover:bg-white'>
                        <Link href='/about'><GlobeAlt className={'w-6 h-6'} /></Link>
                    </div>
                    <div className='bg-indigo-400 p-2 rounded-full w-10 items-center flex justify-center transition-colors duration-200 dark:bg-yellow-500 dark:hover:bg-black hover:bg-white'>
                        <Link href={siteConfig('HEO_INFO_CARD_URL', null, CONFIG)}><i className='fab fa-github text-xl' />
                        </Link>
                    </div>
                </div>
                <MoreButton />
            </div>
        </Card>
  )
}

/**
 * 欢迎语
 */
function GreetingsWords() {
  const greetings = siteConfig('HEO_INFOCARD_GREETINGS', null, CONFIG);
  const [greeting, setGreeting] = useState(greetings[0]);

  // useEffect用来处理定时更新greeting
  useEffect(() => {
    const interval = setInterval(() => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * greetings.length);
      } while (greetings[randomIndex] === greeting); // 如果选中的和当前的一样，则重新选取

      setGreeting(greetings[randomIndex]);
    }, 5000); // 每5秒更新一次

    return () => clearInterval(interval); // 清除interval，避免内存泄漏
  }, [greetings, greeting]); // 当greetings或者greeting发生变化时重新设置定时器

  return (
    <div className="select-none cursor-pointer py-1 px-2 bg-indigo-400 hover:bg-indigo-50 dark:bg-yellow-500 dark:hover:bg-black text-sm rounded-lg duration-200 transition-colors animate-fade-in-out">
      {greeting}
    </div>
  );
}

export default GreetingsWords;

/**
 * 了解更多按鈕
 * @returns
 */
function MoreButton() {
  return <Link href='/about'>
        <div className={'group bg-indigo-400 dark:bg-yellow-500 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white flex items-center transition-colors duration-200 py-2 px-3 rounded-full space-x-1'}>
            <ArrowRightCircle className={'group-hover:stroke-black dark:group-hover:stroke-white w-6 h-6 transition-all duration-100'} />
            <div className='font-bold'>了解更多</div>
        </div>
    </Link>
}
