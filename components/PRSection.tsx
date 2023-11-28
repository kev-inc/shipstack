import { PullRequest } from "@/models/models"
import PRRowLoader from "./PRRowLoader"
import PRRow from "./PRRow"
import Badge from "./Badge"

type PRSectionProps = {
  title: string,
  prs: PullRequest[],
  isLoading: boolean
}

const PRSection = ({ title, prs, isLoading }: PRSectionProps) => {
  return (
    <div id={title} className="m-4">
      <div className="px-4 py-2 font-medium text-gray-700">
        {title} <Badge number={prs.length} />
      </div>

      <div className='mt-2 bg-white rounded-lg overflow-hidden shadow grid grid-cols-1 divide-y'>
        {prs.length > 0 ? (
          prs.map((pull, index) => <PRRow key={index} pull={pull} />)
        ) : isLoading ? (
          <div>
            <PRRowLoader />
          </div>
        ) : (
          <div className="flex p-4 text-xs justify-center text-gray-500">
            No results found
          </div>
        )}
      </div>
    </div>
  )
}

export default PRSection