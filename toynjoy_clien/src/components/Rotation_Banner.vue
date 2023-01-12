<template>
    <div id="purchases_product_8">
        <!--购买量最多的前8个-->
        <p>
            <span>销量冠军</span>
        </p>
        <div id="purchases_product_8_main" class="carousel slide" data-ride="carousel">
            <ul class="carousel-indicators">
                <li data-target="#purchases_product_8_main" data-slide-to="0" class="active"></li>
                <li data-target="#purchases_product_8_main" data-slide-to="1"></li>
            </ul>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <!-- @for (int i = 0; i < ((ViewData["purchases_product_8"] as List<ToyNJoy.Models.Product>
                        ).ToList().Count / 2); i++)
                        {
                        <a class="product_box" style="background-image:url('../../Content/Image/products/@((ViewData["
                            purchases_product_8"] as List<ToyNJoy.Models.Product>).ToList()[i].image)')"
                            href="/Huangjunxi/Product?id=@((ViewData["purchases_product_8"] as List
                            <ToyNJoy.Models.Product>).ToList()[i].id)">
                                <p>
                                    <span>
                                        @((ViewData["purchases_product_8"] as List<ToyNJoy.Models.Product>)[i].name)
                                    </span>
                                </p>
                        </a>
                        } -->
                </div>
                <div class="carousel-item">
                    <!-- @for (int i = ((ViewData["purchases_product_8"] as List<ToyNJoy.Models.Product>).ToList().Count /
                        2); i < (ViewData["purchases_product_8"] as List<ToyNJoy.Models.Product>).ToList().Count; i++)
                            {
                            <a class="product_box"
                                style="background-image:url('../../Content/Image/products/@((ViewData["
                                purchases_product_8"] as List<ToyNJoy.Models.Product>).ToList()[i].image)')"
                                href="/Huangjunxi/Product?id=@((ViewData["purchases_product_8"] as List
                                <ToyNJoy.Models.Product>).ToList()[i].id)">
                                    <p>
                                        <span>
                                            @((ViewData["purchases_product_8"] as List<ToyNJoy.Models.Product>)[i].name)
                                        </span>
                                    </p>
                            </a>
                            } -->
                </div>
            </div>
            <a class="carousel-control-prev min" href="#purchases_product_8_main" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
            </a>
            <a class="carousel-control-next min" href="#purchases_product_8_main" data-slide="next">
                <span class="carousel-control-next-icon"></span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Rotation_Banner'
}
</script>

<style>

</style>