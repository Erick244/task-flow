function Ball() {
    return <div className="w-3 h-3 bg-gray-500 rounded-full"></div>;
}

export function BallsLoading() {
    return (
        <div className="flex space-x-2 animate-pulse">
            <Ball />
            <Ball />
            <Ball />
        </div>
    );
}
