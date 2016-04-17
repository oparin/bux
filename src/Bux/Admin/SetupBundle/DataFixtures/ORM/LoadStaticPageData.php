<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 3/2/15
 * Time: 12:20 PM
 */

namespace Bux\Admin\SetupBundle\DataFixtures\ORM;

use Bux\Admin\SetupBundle\Entity\StaticPage;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadStaticPageData
 *
 * @package Bux\Admin\SetupBundle\DataFixtures\ORM
 */
class LoadStaticPageData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     */
    public function load(ObjectManager $manager)
    {
        $page = new StaticPage();
        $page->setName('home_page');
        $page->setContent('lalalal');
        $manager->persist($page);

        $page = new StaticPage();
        $page->setName('footer_1');
        $page->setContent('lalalal');
        $manager->persist($page);

        $page = new StaticPage();
        $page->setName('footer_2');
        $page->setContent('lalalal');
        $manager->persist($page);

        $page = new StaticPage();
        $page->setName('footer_3');
        $page->setContent('lalalal');
        $manager->persist($page);

        $page = new StaticPage();
        $page->setName('footer_4');
        $page->setContent('lalalal');
        $manager->persist($page);

        $page = new StaticPage();
        $page->setName('testimonials');
        $page->setContent('lalalal');
        $manager->persist($page);

        $page = new StaticPage();
        $page->setName('faq');
        $page->setContent('lalalal');
        $manager->persist($page);

        $page = new StaticPage();
        $page->setName('terms');
        $page->setContent('lalalal');
        $manager->persist($page);

        $page = new StaticPage();
        $page->setName('about');
        $page->setContent('lalalal');
        $manager->persist($page);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 2;
    }
}