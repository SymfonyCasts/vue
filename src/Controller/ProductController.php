<?php

namespace App\Controller;

use ApiPlatform\Core\Api\IriConverterInterface;
use App\Entity\Category;
use App\Entity\Product;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends AbstractController
{
    /**
     * @Route("/", name="app_homepage")
     */
    public function index(CategoryRepository $categoryRepository): Response
    {
        return $this->render('product/index.html.twig', [
            'categories' => $categoryRepository->findAll(),
        ]);
    }

    /**
     * @Route("/category/{id}", name="app_category")
     */
    public function showCategory(Category $category, IriConverterInterface $iriConverter, CategoryRepository $categoryRepository): Response
    {
        return $this->render('product/index.html.twig', [
            'currentCategoryId' => $iriConverter->getIriFromItem($category),
            'categories' => $categoryRepository->findAll(),
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
