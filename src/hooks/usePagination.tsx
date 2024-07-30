import { useState, useMemo, useEffect } from "react";
import { 
    GrFormPrevious as PreviousIcon,
    GrFormNext as NextIcon
} from "react-icons/gr";
import { cn } from "../utils/cn";

export const usePagination = <T,>(
    list: any[], 
    itemsPerPage: number = 8
) => {
    
    const [page, setPage] = useState(0)
 
    useEffect(() => {
        const maxPages = Math.ceil(list.length/itemsPerPage)
        if(page < 1 || page > maxPages)
            setPage(1)
    }, [list])

    const paginatedList = useMemo(() => {
        return list.slice((page-1)*itemsPerPage, (page-1)*itemsPerPage + itemsPerPage)
    }, [list, page])

    const pagination = useMemo(() => {
        const maxPages = Math.ceil(list.length/itemsPerPage)
        
        const availPages: React.ReactNode[] = []
        const maxBtnNumber = 5;
        let leftPages = 0
        let rightPages = 0
        let noMoreLeft = false
        let noMoreRight = false
        let l = 1;
        let r = 1
        let direction = -1
        while(availPages.length < maxBtnNumber){
            const j = direction < 0
                ? l
                : r
            const currentPage = page + direction*j
            if(direction < 0){
                if(currentPage < 0){
                    noMoreLeft = true
                    direction = 1
                }else if(leftPages < 2 || noMoreRight){
                    availPages.unshift(
                        <button
                            onClick={() => setPage(currentPage)}
                            className="pagination__btn"
                        >
                            {currentPage}
                        </button>
                    )
                    leftPages++
                    l++
                }
            }else{
                if(currentPage > maxPages){
                    noMoreRight = true;
                    direction = -1
                }else if(rightPages < 2 || noMoreLeft){
                    availPages.push(
                        <button
                            onClick={() => setPage(currentPage)}
                            className={cn(
                                "pagination__btn",
                                currentPage === page ? "active" : ""
                            )}
                        >
                            {currentPage}
                        </button>
                    )
                    rightPages++
                    r++;
                }
            }

            if(noMoreRight && noMoreLeft)
                break;
            if(availPages.length >= maxBtnNumber)
                break;
        }

        const pages = new Array(maxPages)
            .fill(0)
            .map((_, i) => {

                const buttonValue = i+1
                const handlePageChoice = () => {
                    setPage(buttonValue)
                }

                return <button
                    onClick={handlePageChoice}
                    className="pagination__btn"
                >
                    {buttonValue}
                </button>
            })
        

        return <div className="pagination__container">
            {
                page > 1 
                    && <button 
                        className="pagination__btn"
                    >
                        <PreviousIcon
                            onClick={() => setPage(prev => prev - 1)}
                            className="pagination__icon"
                            size={30}
                        />
                    </button>
            }
            {
                pages.length > 1
                    && pages
            }
            {
                page < maxPages  
                    && <button 
                        className="pagination__btn"
                    >
                        <NextIcon
                            onClick={() => setPage(prev => prev + 1)}
                            className="pagination__icon"
                            size={30}
                        />
                    </button>
            }
        </div>
    }, [list, page])

    return {
        paginatedList,
        pagination
    } as {
        paginatedList: T[],
        pagination: React.ReactNode
    }
}