// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../../app/store";
// import { fetchCategory } from "../category/CategorySlice";


// interface CategoryListProps {
//   handleCategoryChange: (categoryId: string) => void;
// }

// const CategoryList: React.FC<CategoryListProps> = ({
//   handleCategoryChange,
// }) => {
//   const [category, setCategory] = React.useState("");
//   const dispatch: AppDispatch = useDispatch();

//   const categories = useSelector((state: RootState) => state.category.items);
//   const status = useSelector((state: RootState) => state.category.status);
//   const error = useSelector((state: RootState) => state.category.error);

//   React.useEffect(() => {
//     if (status === "idle") {
//       console.log("fires dis");
//       dispatch(fetchCategory());
//     }
//   }, [status, dispatch]);

//   if (status === "loading") return <p>Loading...</p>;
//   if (status === "failed") return <p>{error}. Please try again, later.</p>;

//   const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setCategory(e.target.value);

//     const findCategory = categories.find((c) => c.name === e.target.value);

//     if (findCategory) {
//       handleCategoryChange(findCategory?.id);
//     }
//   };

//   return (
//     // <div className="variants-container">
//     //   <select
//     //     className="variants-selector filter-btn"
//     //     value={category || ""}
//     //     onChange={onChange}
//     //   >
//     //     <option value="" disabled>
//     //       Categories
//     //     </option>
//     //     {categories
//     //       ? categories.map((c) => <option key={c.id}>{c.name}</option>)
//     //       : "No Categories Found"}
//     //   </select>
//     // </div>
//     <></>
//   );
// };

// export default CategoryList;
