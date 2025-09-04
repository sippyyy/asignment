"use client"
import Container from "./reusableComponents/Container";
import LeftContent from "./components/LeftContent";
import MainContent from "./components/MainContent";
import RightContent from "./components/RightContent";
import { useSearchStore } from "./store/searchStore";
import SearchContent from "./components/SearchContent";
import { useGetAllPosts } from "./hooks/api/useGetAllPosts";

export default function Home() {
  const { searchQuery,setSearchQuery } = useSearchStore()
  const { data: allPosts, isLoading, error } = useGetAllPosts()

  return (
    <div className="w-screen">
      <Container className="pt-17" >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="hidden md:block md:col-span-3 lg:col-span-2">
            <LeftContent />
          </div>
          <div className="col-span-1 md:col-span-9 lg:col-span-7 relative border-l border-r border-main-linen">
            {allPosts ? (
              searchQuery ? <SearchContent allPosts={allPosts} /> : <MainContent allPosts={allPosts} isLoading={isLoading} error={error} />
            ) : null}
          </div>
          <div className="hidden lg:block lg:col-span-3">
            <RightContent />
          </div>
        </div>
      </Container>
    </div>
  );
}
