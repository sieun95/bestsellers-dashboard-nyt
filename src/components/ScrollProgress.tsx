function ScrollProgress() {
  return (
    <div className="h-1 bg-gray-100">
      <div
        className="h-full bg-blue-500 transition-all duration-200"
        style={{
          width:
            typeof window !== "undefined"
              ? `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
              : "0%",
        }}
      />
    </div>
  );
}

export default ScrollProgress;
