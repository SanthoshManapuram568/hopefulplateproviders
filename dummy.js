$(document).ready(function () {
    const SUPABASE_URL = "YOUR_SUPABASE_URL"; // Replace with your Supabase URL
    const SUPABASE_KEY = "YOUR_SUPABASE_KEY"; // Replace with your Supabase API key
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const photosArray = []; // Store fetched photos globally
    const photosPerRow = window.innerWidth > 768 ? 8 : 4; // 8 for large screens, 4 for small

    // Fetch initial photos and display in grid
    const fetchInitialPhotos = async () => {
        try {
            const { data: photos, error } = await supabase.from("photos").select("*").order("id", { ascending: false });
            if (error) throw error;

            photosArray.push(...photos); // Store photos globally
            displayGridPhotos(photos.slice(0, photosPerRow)); // Display first 4/8 photos
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    };

    // Display photos in grid on main page
    const displayGridPhotos = (photos) => {
        const grid = $("#photoGrid");
        grid.empty(); // Clear existing grid

        photos.forEach((photo) => {
            const photoBox = `
                <div class="col-6 col-md-3 p-2">
                    <img src="${photo.url}" alt="Photo" class="img-thumbnail w-100">
                </div>`;
            grid.append(photoBox);
        });
    };

    // Fetch and display all photos in the modal
    const fetchAndDisplayAllPhotos = async () => {
        const modalContainer = $("#photosContainer");
        modalContainer.empty(); // Clear modal content

        photosArray.forEach((photo) => {
            const photoBox = `
                <div class="p-2" style="width: 25%;">
                    <img src="${photo.url}" alt="Photo" class="img-thumbnail w-100">
                </div>`;
            modalContainer.append(photoBox);
        });

        $("#photosModel").modal("show");
    };

    // Event listener for "View All" button
    $("#viewAllButton").on("click", fetchAndDisplayAllPhotos);

    // Initialize by fetching and displaying initial photos
    fetchInitialPhotos();
});
