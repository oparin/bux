<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 12/16/14
 * Time: 4:41 PM
 */

namespace Bux\BlogBundle\DataFixtures\ORM;

use Bux\BlogBundle\Entity\Blog;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadBlogData
 *
 * @package Bux\BlogBundle\DataFixtures\ORM
 */
class LoadBlogData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
//        for ($i = 1; $i < 100; $i++) {
//            $blog = new Blog();
//            $blog->setUser($this->getReference('user'));
//            $blog->setCategory($this->getReference('auto'));
//            $blog->setTitle('Test title');
//            $blog->setText('lalala bebebe');
//            $blog->setDate(new \DateTime());
//            $manager->persist($blog);
//        }
//
//        for ($i = 1; $i < 100; $i++) {
//            $blog = new Blog();
//            $blog->setUser($this->getReference('user'));
//            $blog->setCategory($this->getReference('computers'));
//            $blog->setTitle('Test title');
//            $blog->setText('lalala bebebe');
//            $blog->setDate(new \DateTime());
//            $manager->persist($blog);
//        }
//
//        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 4;
    }
}