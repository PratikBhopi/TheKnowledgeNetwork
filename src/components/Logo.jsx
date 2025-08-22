function Logo() {
    return (
      <div className="flex items-center gap-2">
        {/* Vertical divider */}
        <div className="w-[2px] h-14 bg-red-500"></div>
  
        {/* Text */}
        <div className="flex flex-col leading-none font-extralight  tracking-tight text-lg">
          <span><span>T</span>HE</span>
          <span>KNOWLEDGE</span>
          <span>NETWORK</span>
        </div>
      </div>
    );
  }
  
  export default Logo;
  