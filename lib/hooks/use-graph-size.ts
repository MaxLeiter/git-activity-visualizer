const useGraphSize = () => {
    const margin = { top: 30, right: 30, bottom: 75, left: 70 },
    rawWidth = 800,
    rawHeight = 400,
    width = rawWidth - margin.left - margin.right,
    height = rawHeight - margin.top - margin.bottom

    return {
        margin,
        rawWidth,
        rawHeight,
        width,
        height
    }
}

export default useGraphSize