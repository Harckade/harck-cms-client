import { Helmet } from "react-helmet";
import { useEffect, useState } from 'react';
import { Text } from "../../consts/translations/blog";
import { Page } from "./page";
import Pagination from "react-js-pagination";
import { useRouter } from 'next/router'

export const Blog = ({lang, articles, totalPages, currentPage}) => {
    const router = useRouter();
    let isBrowser = typeof window !== "undefined" ? true : false;
    const [isSmallWindow, setIsSmallWindow] = useState(isBrowser ? window.innerWidth <= 768 : false);

    useEffect(() => {
        if (isBrowser) {
            window.addEventListener("resize", () => {
                setIsSmallWindow(window.innerWidth <= 768);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isBrowser) {
            if (window.innerWidth <= 768 && isSmallWindow === false) {
                setIsSmallWindow(true);
            }
            else if (window.innerWidth > 768 && isSmallWindow === true) {
                setIsSmallWindow(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <div>
            <Helmet>
                <title>{Text.Title[lang]}</title>
                <meta name="description" content={Text.TitleDescription[lang]} />
            </Helmet>

            {
                articles.length > 0 ? <Page articles={articles} lang={lang} /> : <h1 className="text-center">{Text.NoArticles[lang]}</h1>
            }

            {totalPages > 0 ?
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pagination-active"
                    activePage={currentPage}
                    itemsCountPerPage={1}
                    totalItemsCount={totalPages}
                    pageRangeDisplayed={5}
                
                    getPageUrl={(pg) => {
                        if (router.pathname.startsWith(`/${lang}/blog/`)){
                            return pg;
                        }
                        return `blog/${pg}`;
                    }}
                    onChange={(pg) => {
                        if (router.pathname.startsWith(`/${lang}/blog/`)){
                            router.push(`${pg}`)
                        }
                        else{
                            router.push(`blog/${pg}`)
                        }
                       
                    }}
                />
                : ''}
        </div>
    )
}