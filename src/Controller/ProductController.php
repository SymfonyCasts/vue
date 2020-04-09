<?php

namespace App\Controller;


use App\Entity\Category;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class ProductController extends AbstractController
{
    /**
     * @Route("/", name="app_homepage")
     */
    public function index(SerializerInterface $serializer): Response
    {
        return $this->render('product/index.html.twig', [
            'categoriesJson' => $serializer->serialize($this->getCategories(), 'json'),
        ]);
    }

    /**
     * @Route("/category/{id}", name="app_category")
     */
    public function showCategory(int $id, SerializerInterface $serializer): Response
    {
        return $this->render('product/index.html.twig', [
            'currentCategoryId' => $id,
            'categoriesJson' => $serializer->serialize($this->getCategories(), 'json'),
        ]);
    }

    /**
     * @Route("/product/{id}", name="app_product")
     */
    public function showProduct(int $id, SerializerInterface $serializer): Response
    {
        return $this->render('product/index.html.twig', [
            'currentProductId' => $id,
            'categoriesJson' => $serializer->serialize($this->getCategories(), 'json'),
        ]);
    }
}
