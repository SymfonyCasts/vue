<?php

namespace App\Controller;


use ApiPlatform\Core\Api\IriConverterInterface;
use App\Entity\Category;
use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends AbstractController
{
    /**
     * @Route("/", name="app_homepage")
     */
    public function index(): Response
    {
        return $this->render('product/index.html.twig');
    }

    /**
     * @Route("/category/{id}", name="app_category")
     */
    public function showCategory(Category $category, IriConverterInterface $iriConverter): Response
    {
        return $this->render('product/index.html.twig', [
            'currentCategoryId' => $iriConverter->getIriFromItem($category),
        ]);
    }

    /**
     * @Route("/product/{id}", name="app_product")
     */
    public function showProduct(Product $product): Response
    {
        return $this->render('product/index.html.twig');
    }
}
