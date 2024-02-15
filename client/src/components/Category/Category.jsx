import { AddCategory } from "./AddCategory";
import { ListingCategories } from "../Category/ListingCategories";

export const Category = () => {
  return (
    <div className="flex flex-col items-center">
      <ListingCategories />
      <AddCategory />
    </div>
  );
};
