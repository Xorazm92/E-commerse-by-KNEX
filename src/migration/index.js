import { createAddressesTable, createCartItemsTable, createCartsTable, createCategoriesTable, createProductsTable, createReviewTable, createSocialProfilesTable, createUserTable, createWishlistTable } from "../schemas/index.js"
export const migrate = async () => {
    try {
        await createUserTable();
        await createAddressesTable();
        await createSocialProfilesTable();
        await createCategoriesTable();
        await createProductsTable();
        await createReviewTable();
        await createCartsTable();
        await createCartItemsTable();
        await createWishlistTable();

        return {
            status: 'success',
            message: 'Migration completed successfully',
        };
    } catch (error) {
        throw new Error(`Migration failed: ${error.message}`);
    }
};


