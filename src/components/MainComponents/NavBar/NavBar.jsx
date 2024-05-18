export function NavBar() {
  return (
    <div className="w-full px-8 justify-between text-black  border-b border-zinc-200  items-center flex h-[80px]">
      <img alt="" src="/image.svg" className="w-[90px]" />
      <div className="flex gap-3 text-black">
        <p>My Account</p>
        <p>Support</p>
      </div>
    </div>
  );
}
