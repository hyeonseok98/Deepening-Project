"use client";

import useQueryClubs from "../../../../../store/queries/UseQueryClubs";
import CategoryButtons from "../../_components/CategoryButtons";
import ColorButtons from "../../_components/ColorButtons";
import CustomButton from "../../_components/CustomButton";
import LoadingSpinner from "../../_components/LoadingSpinner";

import useSubmitPost from "../../_components/UseSubmitPost";

const CreatePostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { handleSubmit, handleColorChange, handleCategoryChange, contentRef, nicknameRef, bgColor, categoryRef } =
    useSubmitPost(id, "white", "응원글");

  const { clubData, isPending, error } = useQueryClubs(id);
  if (isPending) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <h1>에러가 발생했습니다: {error.message}</h1>;
  }

  if (!clubData || clubData.length === 0) {
    return <h1>클럽 데이터를 불러올 수 없습니다</h1>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="font-black text-xl self-start ml-10 pb-5 ">{`${clubData[0].title}님의 모임`}</h1>
      <section className="w-full pl-11 flex items-center ">
        <input
          id="nickname"
          ref={nicknameRef}
          required
          className="w-20 bg-customYellow border-b border-gray-300 outline-none text-black-500"
        />
        <span className="mr-3 font-bold">님의</span>
        <CategoryButtons handleCategoryChange={handleCategoryChange} />
      </section>

      <form onSubmit={handleSubmit} className="w-4/5">
        <section className="my-4">
          <textarea
            id="content"
            ref={contentRef}
            className="w-full p-2 text-2xl  border border-gray-300 rounded-md min-h-[30rem] resize-none shadow-xl bg-no-repeat bg-[length:4rem_4rem] bg-right-bottom"
            style={{ backgroundColor: bgColor, backgroundImage: 'url("/logo.png")' }}
          />
        </section>
        <label className="block mb-2 p-3 font-bold text-lg text-gray-700">편지지 색상을 선택하세요</label>
        <section>
          <div className="flex space-x-2 mb-12 justify-center pb-7">
            <ColorButtons handleColorChange={handleColorChange} />
          </div>
          <div className="flex justify-end">
            <CustomButton type="submit">작성</CustomButton>
          </div>
        </section>
      </form>
    </main>
  );
};

export default CreatePostPage;
