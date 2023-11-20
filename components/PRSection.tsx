import { PullRequest } from "@/models/models"
import PRRowLoader from "./PRRowLoader"
import PRRow from "./PRRow"

type PRSectionProps = {
  title: string,
  prs: PullRequest[],
  isLoading: boolean
}

const PRSection = ({ title, prs, isLoading }: PRSectionProps) => {
  return (
    <div id={title} className=" m-4 border rounded">
      <div className="px-4 py-2 font-medium bg-slate-50 text-gray-900">
        {title} ({prs.length})
      </div>

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
  )
}

export default PRSection