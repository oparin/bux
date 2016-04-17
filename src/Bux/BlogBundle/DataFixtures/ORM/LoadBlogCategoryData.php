<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/16/14
 * Time: 4:34 PM
 */

namespace Bux\BlogBundle\DataFixtures\ORM;

use Bux\BlogBundle\Entity\BlogCategory;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadBlogCategoryData
 *
 * @package Bux\BlogBundle\DataFixtures\ORM
 */
class LoadBlogCategoryData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
//        $category = new BlogCategory();
//        $category->setName('Auto');
//        $category->setUser($this->getReference('user'));
//        $manager->persist($category);
//        $this->setReference('auto', $category);
//
//        $category = new BlogCategory();
//        $category->setName('Computers');
//        $category->setUser($this->getReference('user'));
//        $manager->persist($category);
//        $this->setReference('computers', $category);

//        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 3;
    }
}