const PRRowLoader = () => (
    <div className="animate-pulse px-4 py-2 border-t text-sm flex">
        <div className="flex-1">
            <div className="h-3 bg-slate-200 rounded w-96 mb-2"></div>
            <div className="flex items-center text-xs text-gray-500 gap-x-1">
                <div className="rounded-full bg-slate-200 h-5 w-5"></div>
                <div className="h-3 bg-slate-200 rounded w-16"></div>
                <span className="text-slate-200">•</span>
                <div className="h-3 bg-slate-200 rounded w-28"></div>
            </div>
        </div>
        <div className="flex items-center">
            <div className="h-3 bg-slate-200 rounded w-16"></div>
        </div>
    </div>
)

export default PRRowLoader