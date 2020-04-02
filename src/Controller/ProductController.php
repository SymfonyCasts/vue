<?php

namespace App\Controller;


use App\Entity\Category;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends AbstractController
{
    /**
     * @Route("/", name="app_homepage")
     * @return Response
     */
    public function index()
    {
        return $this->render('product/index.html.twig');
    }

    /**
     * @Route("/category/{id}", name="app_category")
     * @param int $id
     * @return Response
     */
    public function showCategory(int $id)
    {
        return $this->render('product/index.html.twig', [
            'currentCategoryId' => $id,
        ]);
    }

    /**
     * @Route("/product/{id}", name="app_product")
     * @param int $id
     * @return Response
     */
    public function showProduct(int $id)
    {
        return $this->render('product/index.html.twig');
    }
}
