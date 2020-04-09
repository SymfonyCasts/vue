<?php

namespace App\Controller;


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
    public function showCategory(int $id): Response
    {
        return $this->render('product/index.html.twig', [
            'currentCategoryId' => $id,
        ]);
    }

    /**
     * @Route("/product/{id}", name="app_product")
     */
    public function showProduct(int $id): Response
    {
        return $this->render('product/index.html.twig');
    }
}
